  //to use uniform in vertex only we to have defined uniform
//attributes are vertex specific data we cant import it in fragment glsl
//MAT4 is basically a matrix with 4x4 we can also use mat2 etc

// uniform MAT4 projectionMatrix;
// uniform MAT4 modelViewMatrix;
//Modelview matrix is a combination of two matrix which is model matrix and view matrix
//model matrix : position,scale , rotation of our model
//view matrix : position,orientation, of our camera
// projectionmatrix : projects our objects onto screen (aspect ratio & the perspective)
uniform float uTime;
varying vec3 VPosition;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
	vNormal = normal;
	vUv = uv;
	VPosition = position;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

