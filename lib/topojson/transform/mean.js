module.exports = function(topology) {
  var arcs = topology.arcs,
      i = -1,
      n = arcs.length,
      count = 0,
      accx = 0, accy = 0;
  while(++i < n) {
    var arc = arcs[i],
        j = -1,
        m = arc.length,
        point;
    while(++j < m) {
      point = arc[j];
      accx += point[0];
      accy += point[1];
      count++;
    }
  }
  return [accx/count,accy/count];
};
