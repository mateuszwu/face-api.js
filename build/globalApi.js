"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allFacesFactory_1 = require("./allFacesFactory");
var FaceDetectionNet_1 = require("./faceDetectionNet/FaceDetectionNet");
var FaceLandmarkNet_1 = require("./faceLandmarkNet/FaceLandmarkNet");
var FaceRecognitionNet_1 = require("./faceRecognitionNet/FaceRecognitionNet");
var Mtcnn_1 = require("./mtcnn/Mtcnn");
exports.detectionNet = new FaceDetectionNet_1.FaceDetectionNet();
exports.landmarkNet = new FaceLandmarkNet_1.FaceLandmarkNet();
exports.recognitionNet = new FaceRecognitionNet_1.FaceRecognitionNet();
// nets need more specific names, to avoid ambiguity in future
// when alternative net implementations are provided
exports.nets = {
    ssdMobilenet: exports.detectionNet,
    faceLandmark68Net: exports.landmarkNet,
    faceNet: exports.recognitionNet,
    mtcnn: new Mtcnn_1.Mtcnn()
};
function loadFaceDetectionModel(url) {
    return exports.nets.ssdMobilenet.load(url);
}
exports.loadFaceDetectionModel = loadFaceDetectionModel;
function loadFaceLandmarkModel(url) {
    return exports.nets.faceLandmark68Net.load(url);
}
exports.loadFaceLandmarkModel = loadFaceLandmarkModel;
function loadFaceRecognitionModel(url) {
    return exports.nets.faceNet.load(url);
}
exports.loadFaceRecognitionModel = loadFaceRecognitionModel;
function loadMtcnnModel(url) {
    return exports.nets.mtcnn.load(url);
}
exports.loadMtcnnModel = loadMtcnnModel;
function loadModels(url) {
    return Promise.all([
        loadFaceDetectionModel(url),
        loadFaceLandmarkModel(url),
        loadFaceRecognitionModel(url),
        loadMtcnnModel(url)
    ]);
}
exports.loadModels = loadModels;
function locateFaces(input, minConfidence, maxResults) {
    return exports.nets.ssdMobilenet.locateFaces(input, minConfidence, maxResults);
}
exports.locateFaces = locateFaces;
function detectLandmarks(input) {
    return exports.nets.faceLandmark68Net.detectLandmarks(input);
}
exports.detectLandmarks = detectLandmarks;
function computeFaceDescriptor(input) {
    return exports.nets.faceNet.computeFaceDescriptor(input);
}
exports.computeFaceDescriptor = computeFaceDescriptor;
function mtcnn(input, forwardParams) {
    return exports.nets.mtcnn.forward(input, forwardParams);
}
exports.mtcnn = mtcnn;
exports.allFaces = allFacesFactory_1.allFacesFactory(exports.detectionNet, exports.landmarkNet, exports.recognitionNet);
//# sourceMappingURL=globalApi.js.map