

function initShaders(gl, vshader, fshader) {
var program = createProgram(gl, vshader, fshader);
if (!program) {
console.log('failed to create program');
return false;
}
gl.useProgram(program);
gl.program = program;
return true;
}

function createProgram(gl, vshader, fshader) {

var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
if (!vertexShader || !fragmentShader) {
return null;
}

var program = gl.createProgram();
if (!program) {
return null;
}

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
if (!linked) {
var error = gl.getProgramInfoLog(program);
console.log('failed to link program: ' + error);
gl.deleteProgram(program);
gl.deleteShader(fragmentShader);
gl.deleteShader(vertexShader);
return null;
}
return program;
}

function loadShader(gl, type, source) {

var shader = gl.createShader(type);
if (shader == null) {
console.log('unable to create shader');
return null;
}

gl.shaderSource(shader, source);

gl.compileShader(shader);

var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
if (!compiled) {
var error = gl.getShaderInfoLog(shader);
console.log('failed to compile shader: ' + error);
gl.deleteShader(shader);
return null;
}
return shader;
}

function loadVariableLocations(gl, program) {
var i, name;

var attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

var attribIndex = {};
for (i = 0; i < attribCount; ++i) {
name = gl.getActiveAttrib(program, i).name;
attribIndex[name] = i;
}

var uniformLoc = {};
for (i = 0; i < uniformCount; ++i) {
name = gl.getActiveUniform(program, i).name;
uniformLoc[name] = gl.getUniformLocation(program, name);
}

program.attribIndex = attribIndex;
program.uniformLoc = uniformLoc;
}

function getWebGLContext(canvas, opt_debug) {
var gl = WebGLUtils.setupWebGL(canvas);
if (!gl) return null;
if (arguments.length < 2 || opt_debug) {
gl = WebGLDebugUtils.makeDebugContext(gl);
}
return gl;
}