module.exports = function(ev, topology,q) {
  var arcs = topology.arcs,
      dotProd = function(a,b) { var res = a[0]*b[0]+a[1]*b[1]; return res; },
      i = -1,
      n = arcs.length,
      mins = [],
      maxs = [];
  while(++i < n) {
    var arc = arcs[i],
        j = -1,
        m = arc.length;
    while(++j < m) {
      var point = arc[j],
          dp0 = dotProd(ev[0],point),
          dp1 = dotProd(ev[1],point);
      if(mins[0] === undefined || mins[0] > dp0) mins[0] = dp0;
      if(mins[1] === undefined || mins[1] > dp1) mins[1] = dp1;
      if(maxs[0] === undefined || maxs[0] < dp0) maxs[0] = dp0;
      if(maxs[1] === undefined || maxs[1] < dp1) maxs[1] = dp1;
    }
  }
  var range0 = Math.abs(maxs[0]-mins[0])/q,
      range1 = Math.abs(maxs[1]-mins[1])/q;
  return [range0,range1];
};
