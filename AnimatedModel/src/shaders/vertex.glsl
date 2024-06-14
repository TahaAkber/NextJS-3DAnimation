  //to use uniform in vertex only we to have defined uniform
//attributes are vertex specific data we cant import it in fragment glsl
//MAT4 is basically a matrix with 4x4 we can also use mat2 etc

attributes vec3 position; //attributes has an array which defines position,shapes,edges and their values
uniform MAT4 projectionMatrix;
uniform MAT4 modelViewMatrix;
//Modelview matrix is a combination of two matrix which is model matrix and view matrix
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
