import flightData from './../data.json';
import { transformFlightDates } from './utils';

//Using a graph algorithm to recursively explore all the connected nodes and find all connected flight paths
function paths({ graph = [], from, to, date }, path = []) {
  const linkedNodes = connectedNodes(nodes.bind(null, graph));
  return explore(from, to);

  function explore(currNode, to, paths = [], originalNode) {
    path.push(originalNode || currNode);
    for (let linkedNode of linkedNodes(currNode)) {
      if (linkedNode.destination === to) {
        let result = path.slice(); // copy values
        result.push({ ...linkedNode });
        paths.push(result);
        continue;
      }
      // do not traverse paths already explored
      if (!hasEdgeBeenTraversedInPath({
        edge: {
          from: currNode,
          to: linkedNode.destination
        },
        path: path.map(a => a && a.destination ? a.destination : a)
      })) {
        explore(linkedNode.destination, to, paths, linkedNode);
      }
    }
    path.pop(); // sub-graph fully explored 

    return paths;
  }
}

/** 
* Get all nodes linked 
* to from `node`.
*/
function nodes(graph, node) {
  const list = graph.reduce((p, c) => {
    (c.origin === node) && p.push({ destination: c.destination, config: { ...c } });
    return p;
  }, []);
  return list;
}

/**
* Has an edge been followed 
* in the given path?
*/
function hasEdgeBeenTraversedInPath({ edge, path }) {
  var indices = allIndices(path, edge.from);
  return indices.some(i => path[i + 1] === edge.to);
}

/**
* Utility to get all indices of 
* values matching `val` in `arr`.
*/
function allIndices(arr, value) {
  var indices = [],
    i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      indices.push(i);
    }
  }
  return indices;
}

/**
* Avoids recalculating flight route 
* nodes.
*/
function connectedNodes(fn) {
  const flightCache = new Map();
  return function () {
    var key = JSON.stringify(arguments);
    var cached = flightCache.get(key);
    if (cached) {
      return cached;
    }
    cached = fn.apply(this, arguments)
    flightCache.set(key, cached);
    return cached;
  };
}

function filterPaths(paths, date, numOfPassengers) {

  const list = paths.filter(path => {
    return isSameDestination(path);
  });

  const finalPaths = list.filter(path => {
    return checkLayoverCriteria(path, date);
  });

  const transformedPaths = {
    nonStopFlights: [],
    multiStopFlights: [],
  }

  finalPaths.forEach((path, index) => {
    if (path.length === 2) {
      transformedPaths.nonStopFlights.push({
        ...path[1].config,
        price: path[1].config.price * (parseInt(numOfPassengers) || 1)
      })
    }
    else {
      let totalFare = 0, multiFlights = [], layovers = path.length - 1;
      for (let i = 1; i < path.length; i++) {
        multiFlights.push({ ...path[i].config });
        totalFare += path[i].config.price;
      }

      transformedPaths.multiStopFlights.push({
        cumulativeFlight: {
          origin: path[0],
          destination: path[layovers].destination,
          date: path[1].config.date,
          departureTime: path[1].config.departureTime,
          arrivalTime: path[layovers].config.arrivalTime,
          arrivalTimeStamp: path[layovers].config.arrivalTimeStamp,
          departureTimeStamp: path[1].config.departureTimeStamp,
          dayChange: path[1].config.date !== path[layovers].config.date,
          totalFare: totalFare * (parseInt(numOfPassengers) || 1)
        },
        flights: multiFlights
      })
    }

    return transformedPaths;
  });

  return transformedPaths;
}

function checkLayoverCriteria(path, startDate) {
  let lowerLayover = false;

  if (path.length > 1 && (path[1].config.date !== startDate.replace(/-/g, '/'))) {
    return false;
  }

  for (let i = 0; i < path.length - 1; i++) {
    if (typeof path[i] === "object" && typeof path[i + 1] === "object" && path[i + 1].config.departureTimeStamp - path[i].config.arrivalTimeStamp <= 1800000) {
      lowerLayover = true;
      break;
    }
  }

  return !lowerLayover;
}

function isSameDestination(links) {
  let duplicate = false;
  let keys = {};
  for (let i = 0; i < links.length; i++) {
    const keyName = links[i] && links[i].destination ? links[i].destination : links[i];
    if (keys.hasOwnProperty(keyName)) {
      duplicate = true;
      break;
    }
    keys[keyName] = links[i]
  }
  return !duplicate;
}

export function findPaths({ flights = transformFlightDates(flightData), criteria = { origin: 'Bengaluru (BLR)', destination: 'Delhi (DEL)' } }) {
  return filterPaths(paths({
    graph: flights,
    from: criteria.origin,
    to: criteria.destination,
  }), criteria.date, criteria.numOfPassengers)
}

