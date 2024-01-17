package com.example.jobmagnetv2.controller;

import com.example.jobmagnetv2.model.FrontUser;
import com.example.jobmagnetv2.model.User;
import com.example.jobmagnetv2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
  private final UserService userService;

  @GetMapping("/uid")
  public User findUserByKcUID(@RequestParam String uid) {
    return userService.getUserByKcUID(uid);
  }

  @PostMapping
  public User addUser(@RequestBody FrontUser frontUser) {
    return userService.addUser(frontUser);
  }
}
