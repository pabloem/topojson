module.exports = function(topology,means) {
  var arcs = topology.arcs,
      i = -1,
      n = arcs.length,
      mx = means[0], my = means[1],
      cxx = 0, cxy = 0, cyy = 0,
      count = 0;
  while(++i < n) {
    var arc = arcs[i],
        j = 0,
        m = arc.length;
    while(++j < m) {
      var point = arc[j],
          x = point[0],
          y = point[1];
      count++;
      cxx += (x - mx)*(x - mx);
      cyy += (y - my)*(y - my);
      cxy += (x - mx)*(y - my);
    }
  }
  cxx = cxx/count;
  cyy = cyy/count;
  cxy = cxy/count;
  return [[cxx, cxy],
          [cxy,cyy]];
};
