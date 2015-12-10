var mean = require("./mean.js"),
    covarianceMatrix = require("./covarianceMatrix.js"),
    scaleEigenvectors = require("./scaleEigenvectors.js");

module.exports.transform = function(topology,bounds,q) {
  var u = mean(topology),
      S = covarianceMatrix(topology,u),
      D = S[0][0]*S[1][1] - S[0][1]*S[1][0],
      trace = S[0][0]+S[1][1],
      eigenvalues = [trace/2 + Math.sqrt(trace*trace/4 - D),
                     trace/2 - Math.sqrt(trace*trace/4 - D)],
      eigenvectors = [[eigenvalues[0] - S[1][1], S[0][1]],
                      [eigenvalues[1] - S[1][1], S[0][1]]],
      magnitudes = [Math.sqrt(eigenvectors[0][0]*eigenvectors[0][0]+eigenvectors[0][1]*eigenvectors[0][1]),
                    Math.sqrt(eigenvectors[1][0]*eigenvectors[1][0]+eigenvectors[1][1]*eigenvectors[1][1])];
  // Normalizing the eigenvectors
  eigenvectors[0] = [eigenvectors[0][0]/magnitudes[0],eigenvectors[0][1]/magnitudes[0]];
  eigenvectors[1] = [eigenvectors[1][0]/magnitudes[1],eigenvectors[1][1]/magnitudes[1]];
  var scale = scaleEigenvectors(eigenvectors,topology,q);
  //console.log("S: "+S);
  //console.log("Trace: "+trace+" | Det: "+D);
  //console.log("Means: "+u+" | Eigenvalues: "+eigenvalues);
  console.log("Scale: "+scale);
  console.log("Scaled Eigenvectors: "+eigenvectors);
  
  return {"base":eigenvectors,
          "scale":scale};
};
