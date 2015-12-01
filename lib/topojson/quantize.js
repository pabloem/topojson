module.exports = function(dx, dy, kx, ky,error) {

  function quantizePoint(coordinates) {
    if(error !== undefined) {
        var diff = [((Math.round((coordinates[0] + dx) * kx)/kx - dx) - coordinates[0]),
                   ((Math.round((coordinates[1] + dy) * ky)/ky - dy) - coordinates[1])];
       error.error += diff[0]*diff[0]+diff[1]*diff[1]; 
       error.count += 1;
    }
    coordinates[0] = Math.round((coordinates[0] + dx) * kx);
    coordinates[1] = Math.round((coordinates[1] + dy) * ky);
    return coordinates;
  }

  function quantizeLine(coordinates) {
    var i = 0,
        j = 1,
        n = coordinates.length,
        pi = quantizePoint(coordinates[0]),
        pj,
        px = pi[0],
        py = pi[1],
        x,
        y;

    while (++i < n) {
      pi = quantizePoint(coordinates[i]);
      x = pi[0];
      y = pi[1];
      if (x !== px || y !== py) { // skip coincident points
        pj = coordinates[j++];
        pj[0] = px = x;
        pj[1] = py = y;
      }
    }

    coordinates.length = j;
  }

  return {
    point: quantizePoint,
    line: quantizeLine,
    transform: {
      scale: [1 / kx, 1 / ky],
      translate: [-dx, -dy],
      error: error
    }
  };
};
