package com.example.jobmagnetv2.service;

import java.util.Arrays;
import java.util.List;

import com.example.jobmagnetv2.model.keycloak.AccessToken;
import com.example.jobmagnetv2.model.keycloak.PostUser;
import com.example.jobmagnetv2.model.keycloak.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

@Service
public class KeycloakService {
  @Value("${restAPI.Username}")
  private String username;

  @Value("${restAPI.Pass}")
  private String pass;

  @Value("${restAPI.ClientID}")
  private String clientId;

  @Value("${restAPI.ClientSecret}")
  private String secret;

  @Value("${restAPI.TokenUrl}")
  private String url;

  private final String BASE_URL = "http://172.22.5.249:8080/admin/realms/fit/users";

  public AccessToken getAccessToken() {
    WebClient webClient =
        WebClient.builder()
            .baseUrl(url)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded")
            .build();

    return webClient
        .post()
        .body(
            BodyInserters.fromFormData("client_id", clientId)
                .with("client_secret", secret)
                .with("username", username)
                .with("password", pass)
                .with("grant_type", "client_credentials"))
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(AccessToken.class)
        .block();
  }

  public List<User> getUsers() {
    WebClient webClient =
        WebClient.builder()
            .baseUrl(BASE_URL)
            .defaultHeader("Authorization", "Bearer " + getAccessToken().getAccessToken())
            .build();

    var users =
        webClient
            .get()
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(User[].class)
            .block();

    assert users != null;
    return Arrays.stream(users).toList();
  }

  public User getUserById(String UUID) {
    WebClient webClient =
        WebClient.builder()
            .baseUrl(BASE_URL + "/" + UUID)
            .defaultHeader("Authorization", "Bearer " + getAccessToken().getAccessToken())
            .build();
    try {
      return webClient
          .get()
          .accept(MediaType.APPLICATION_JSON)
          .retrieve()
          .bodyToMono(User.class)
          .block();

    } catch (WebClientResponseException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono takiego użytkownika");
    }
  }

  public User getUserByUsername(String username) {
    WebClient webClient =
        WebClient.builder()
            .baseUrl(BASE_URL)
            .defaultHeader("Authorization", "Bearer " + getAccessToken().getAccessToken())
            .build();
    try {
      var user =
          webClient
              .get()
              .uri(uriBuilder -> uriBuilder.queryParam("username", username).build())
              .accept(MediaType.APPLICATION_JSON)
              .retrieve()
              .bodyToMono(User[].class)
              .block();

      if (user != null && user.length > 0) return user[0];

    } catch (WebClientResponseException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono takiego użytkownika");
    }

    return null;
  }

  public User removeUser(String UUID) {
    WebClient webClient =
        WebClient.builder()
            .baseUrl(BASE_URL + "/" + UUID)
            .defaultHeader("Authorization", "Bearer " + getAccessToken().getAccessToken())
            .build();
    try {
      webClient
          .delete()
          .accept(MediaType.APPLICATION_JSON)
          .retrieve()
          .bodyToMono(Object.class)
          .block();

    } catch (WebClientResponseException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono takiego użytkownika");
    }
    return null;
  }

  public void postUser(PostUser newUser) {
    WebClient webClient =
        WebClient.builder()
            .baseUrl(BASE_URL)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json")
            .defaultHeader("Authorization", "Bearer " + getAccessToken().getAccessToken())
            .build();

    try {
      webClient
          .post()
          .accept(MediaType.APPLICATION_JSON)
          .body(BodyInserters.fromValue(newUser))
          .retrieve()
          .bodyToMono(Object.class)
          .block();
    } catch (WebClientResponseException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Użytkownik już istnieje!");
    }
  }
}
