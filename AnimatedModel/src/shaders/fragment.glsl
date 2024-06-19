// // attributes vec3 position; //attributes has an array which defines position,shapes,edges and their values
// precision mediump float; 
// uniform float uTime;
// varying vec3 VPosition;
// varying vec3 vNormal;
// varying vec2 vUv;
// void main() {
// 	//float int double etc data types
// 	//Fucntions
// 	//clamp() function
// 	//step smoothstep, frac
// 	//Equal function basically a boolean which we use to have true or false
// 	//max, min function
// 	// + - * / and use mod with name 
// 	//sin cosine tan
// 	// dot product and cross product

// 	gl_FragColor = vec4(vUv.xx,1,1.0);
// }
precision mediump float;
uniform float uTime;
varying vec2 vUv;

void main() {
    // Create a time-based factor that oscillates between 0 and 1
    float factor = (sin(uTime) + 1.0) / 2.0;

    // Define the red and white colors
    vec3 color1 = vec3(vUv.x, 0.3, 0.5);  // Orange
    vec3 color2 = vec3(vUv.x, 0.0, 0.0);  // White

    // Interpolate between red and white based on the factor
    vec3 color = mix(color1, color2, factor);

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}

