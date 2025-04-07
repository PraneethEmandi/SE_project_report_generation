// package com.example.backend.service;

// import com.example.backend.model.User;
// import com.example.backend.repository.UserRepository;

// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.util.Optional;

// @Service
// public class UserService {
//     private final UserRepository userRepository;
//     private final BCryptPasswordEncoder passwordEncoder;

//     public UserService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//         this.passwordEncoder = new BCryptPasswordEncoder();
//     }

//     public User registerUser(String name, String email, String password, String firebaseUid) {
//         if (userRepository.findByEmail(email).isPresent()) {
//             // throw new RuntimeException("Email already exists");
//             return null;
//         }

//         User user = new User();
//         user.setName(name);
//         user.setEmail(email);
//         user.setPassword(passwordEncoder.encode(password)); // Hash password
//         user.setFirebaseUid(firebaseUid);
//         return userRepository.save(user);
//     }

//     public Optional<User> authenticate(String email, String password) {
//         Optional<User> userOptional = userRepository.findByEmail(email);
//         if (userOptional.isPresent()) {
//             User user = userOptional.get();
//             if (passwordEncoder.matches(password, user.getPassword())) {
//                 return Optional.of(user);
//             }
//         }
//         return Optional.empty();
//         // return ResponseEntity.status(401).body("Invalid email or password"); // 401 Unauthorized
//     }
// }