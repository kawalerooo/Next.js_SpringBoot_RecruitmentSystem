package com.example.jobmagnetv2.service;

import java.util.List;

import com.example.jobmagnetv2.model.FrontUser;
import com.example.jobmagnetv2.model.User;
import com.example.jobmagnetv2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final KeycloakService keycloakService;

  public List<User> getUsers() {
    return userRepository.findAll();
  }

  public User addUser(FrontUser frontUser) {
    if (keycloakService.getUserByUsername(frontUser.getPostUser().getUsername()) != null)
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Użytkownik już istnieje");

    keycloakService.postUser(frontUser.getPostUser());
    frontUser
        .getUser()
        .setKcUID(
            keycloakService.getUserByUsername(frontUser.getPostUser().getUsername()).getUsername());

    if (userRepository.findUserDataByKcUID(frontUser.getUser().getKcUID()).isEmpty())
      return userRepository.save(frontUser.getUser());

    throw new ResponseStatusException(HttpStatus.CONFLICT, "Użytkownik już istnieje");
  }

  public User updateUser(User user) {
    return userRepository.save(user);
  }

  public User getUserByKcUID(String uid) {
    return userRepository
        .findUserDataByKcUID(uid)
        .orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono użytkownika."));
  }
}
