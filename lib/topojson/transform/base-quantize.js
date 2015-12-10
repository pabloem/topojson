module.exports = function(scale,base,error) {
  var dotProd = function(a,b){ return a[0]*b[0]+a[1]*b[1]; };
  function quantizePoint(coordinates) {
    var qC = [Math.round(dotProd(coordinates,base[0])/scale[0]),
              Math.round(dotProd(coordinates,base[1])/scale[1])];
    var diff = [(coordinates[0] - qC[0]*scale[0]*base[0][0] - qC[1]*scale[1]*base[1][0]),
                (coordinates[1] - qC[0]*scale[0]*base[0][1] - qC[1]*scale[1]*base[1][1])];
    error.error += diff[0]*diff[0]+diff[1]*diff[1];
    error.count += 1;
    coordinates[0] = qC[0];
    coordinates[1] = qC[1];
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
      scale: scale,
      base: base,
      error: error
    }
  };
};
