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


// precision mediump float;
// uniform float uTime;
// varying vec2 vUv;
// uniform sampler2D globalTexture;
// uniform vec3 color4;
// void main() {
//     // Create a time-based factor that oscillates between 0 and 1
//     float factor = (sin(uTime) + 1.0) / 2.0;

//     // Define the red and white colors
//     vec3 color1 = vec3(vUv.x, 0.3, 0.5);  
//     vec3 color2 = vec3(vUv.x, 0.0, 0.0);  

//     // Interpolate between red and white based on the factor
//     vec3 color = mix(color1, color2, factor);

//     // Output the final color
//     gl_FragColor = vec4(color, 1.0);
// }



// precision mediump float;
// uniform float uTime;
// varying vec2 vUv;
// uniform vec3 color4;

// void main() {
//     // Create a new color by combining the input color with the UV coordinates
//     vec3 newcolor = color4 * vec3(vUv, 1.0);

//     // Darken the new color by scaling it down
//     newcolor *= 0.6; // Adjust this value to control the darkness

//     // Set the fragment color
//     gl_FragColor = vec4(newcolor, 1.0);
// }


// precision mediump float;
// uniform float uTime;
// uniform vec4 ourColor; // Dynamic color based on time
// varying vec2 vUv;
// uniform vec3 color4; // Base color
// uniform sampler2D uTexture;

// void main() {
//     // Create a new color by combining the input color with the UV coordinates
//     vec3 newcolor = color4 * vec3(vUv, 1.0);

//     // Darken the new color
//     newcolor *= 0.7;

//     // Mix the new color with the dynamic color
//     vec3 finalColor = mix(newcolor, ourColor.rgb, 0.5);

//     // Ensure finalColor is not completely black
//     finalColor = max(finalColor, 0.1); // Minimum value to avoid pure black
//     vec4 color = texture2D(uTexture,vUv);
//     // Set the fragment color
//     gl_FragColor = vec4(color.xyz, 1.0);
// }



// precision mediump float;
// uniform float uTime;
// uniform vec4 ourColor; // Dynamic color based on time
// varying vec2 vUv;
// uniform vec3 color4; // Base color
// uniform sampler2D uTexture;

// void main() {
//     //added only custom texture
//     vec4 color = texture2D(uTexture,vUv);
//     gl_FragColor = vec4(color.xyz, 1.0);
// }



precision mediump float;
uniform float uTime;
uniform vec4 ourColor; // Dynamic color based on time
varying vec2 vUv;
uniform vec3 color4; // Base color
uniform sampler2D uTexture;

void main() {
    // Sample the texture color
    vec4 texColor = texture2D(uTexture, vUv);

    // Create a new color by combining the input color with the UV coordinates
    vec3 newColor = color4 * vec3(vUv, 1.0);

    // Darken the new color
    newColor *= 1.5;

    // Mix the new color with the dynamic color (ourColor.rgb)
    vec3 dynamicColor = mix(newColor, ourColor.rgb, 0.5);

    // Ensure dynamicColor is not completely black
    dynamicColor = max(dynamicColor, 0.3); // Minimum value to avoid pure black

    // Combine dynamic color with texture color
    vec3 finalColor = dynamicColor * texColor.xyz;

    // Output final color with full alpha (1.0)
    gl_FragColor = vec4(finalColor, 1.0);
}
