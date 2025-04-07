// package com.example.backend.model;

// import jakarta.persistence.*;
// import lombok.Getter;
// import lombok.Setter;

// @Entity
// @Table(name = "users1")
// @Getter
// @Setter
// public class User {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String name;

//     @Column(nullable = false, unique = true)
//     private String email;

//     private String password; // Hashed password
//     private String firebaseUid; // Firebase authentication UID
// }