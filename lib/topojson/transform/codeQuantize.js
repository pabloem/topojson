var quantize = require('./base-quantize.js');

module.exports = function(topology, transform) {
  transform.error = {error:0,count:0};
  var base = transform.base,
      scale = transform.scale,
      q = quantize(scale,base,transform.error);
  function quantizeGeometry(geometry) {
    if (geometry && quantizeGeometryType.hasOwnProperty(geometry.type)) quantizeGeometryType[geometry.type](geometry);
  }
  
  var quantizeGeometryType = {
    GeometryCollection: function(o) { o.geometries.forEach(quantizeGeometry); },
    Point: function(o) { q.point(o.coordinates); },
    MultiPoint: function(o) { o.coordinates.forEach(q.point); }
  };

  for (var key in topology.objects) {
    quantizeGeometry(topology.objects[key]);
  }

  // XXX shared points are bad mmkay
  topology.arcs = topology.arcs.map(function(arc) {
    q.line(arc = arc.map(function(point) { return point.slice(); }));
    if (arc.length < 2) arc.push(arc[0]); // arcs must have at least two points
    return arc;
  });
  console.log(transform);

  return topology;
};
