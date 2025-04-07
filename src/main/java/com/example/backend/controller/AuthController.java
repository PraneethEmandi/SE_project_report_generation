// package com.example.backend.controller;

// import com.example.backend.model.User;
// import com.example.backend.service.UserService;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;
// import java.util.Optional;

// @RestController
// @RequestMapping("/auth")
// // @CrossOrigin(origins = "http://localhost:8081") // Adjust based on frontend URL
// // @CrossOrigin(
// //     origins = {
// //         "http://localhost:8081", 
// //         },
// //     methods = {
// //                 RequestMethod.OPTIONS,
// //                 RequestMethod.GET,
// //                 RequestMethod.PUT,
// //                 RequestMethod.DELETE,
// //                 RequestMethod.POST
// // },
// // allowCredentials = "true"
// // )
// public class AuthController {
//     private final UserService userService;

//     public AuthController(UserService userService) {
//         this.userService = userService;
//     }

//     @PostMapping("/signup")
// //     @CrossOrigin(
// //     origins = {
// //         "http://localhost:8081", 
// //         },
// //     methods = {
// //                 RequestMethod.OPTIONS,
// //                 RequestMethod.GET,
// //                 RequestMethod.PUT,
// //                 RequestMethod.DELETE,
// //                 RequestMethod.POST
// // },
// // allowCredentials = "true"
// // )
//     public ResponseEntity<?> signup(@RequestBody Map<String, String> userMap) {
//         String name = userMap.get("name");
//         String email = userMap.get("email");
//         String password = userMap.get("password");
//         String firebaseUid = userMap.get("firebaseUid");
//         // System.out.println(name);
//         // System.out.println("wsdfsdfsdd");
//         User user=userService.registerUser(name, email, password, firebaseUid);
//         // System.out.println(user);
//         if (user==null) {
//             return ResponseEntity.status(409).body("email already exist"); // 401 Unauthorized
//         }
//         return ResponseEntity.ok(user); // 200 OK with user details
//     }
//     // public User signup(@RequestBody Map<String, String> userMap) {
//     //     String name = userMap.get("name");
//     //     String email = userMap.get("email");
//     //     String password = userMap.get("password");
//     //     String firebaseUid = userMap.get("firebaseUid");

//     //     return userService.registerUser(name, email, password, firebaseUid);
//     // }

//     @PostMapping("/login")
// //     @CrossOrigin(
// //     origins = {
// //         "http://localhost:8081", 
// //         },
// //     methods = {
// //                 RequestMethod.OPTIONS,
// //                 RequestMethod.GET,
// //                 RequestMethod.PUT,
// //                 RequestMethod.DELETE,
// //                 RequestMethod.POST
// // },
// // allowCredentials = "true"
// // )
//     public ResponseEntity<?> login(@RequestBody Map<String, String> userMap) {
//         String email = userMap.get("email");
//         String password = userMap.get("password");

//         Optional<User> userOptional = userService.authenticate(email, password);

//         if (userOptional.isPresent()) {
//             return ResponseEntity.ok(userOptional.get()); // 200 OK with user details
//         } else {
//             return ResponseEntity.status(401).body("Invalid email or password"); // 401 Unauthorized
//         }
//     }      
//     // public Optional<User> login(@RequestBody Map<String, String> userMap) {
//     //     String email = userMap.get("email");
//     //     String password = userMap.get("password");

//     //     return userService.authenticate(email, password);
//     // }
// }

