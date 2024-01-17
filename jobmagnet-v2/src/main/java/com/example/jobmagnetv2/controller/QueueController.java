package com.example.jobmagnetv2.controller;

import com.example.jobmagnetv2.model.Queue;
import com.example.jobmagnetv2.repository.QueueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/queue")
@CrossOrigin
public class QueueController {
  private final QueueRepository queueRepository;

  @GetMapping
  public Queue getQueue() {
    return queueRepository.findAll().get(0);
  }

  @PutMapping
  public Queue updateQueue(@RequestBody Queue queue) {
    return queueRepository.save(queue);
  }
}
