package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.dto.LoginRequest;
import ch.zhaw.init.ehr.ehrbackend.dto.LoginResponse;
import ch.zhaw.init.ehr.ehrbackend.model.User;
import ch.zhaw.init.ehr.ehrbackend.repository.UserRepository;
import ch.zhaw.init.ehr.ehrbackend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*") // for frontend access during development
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return userRepository.findByUsername(request.username)
                .filter(user -> passwordEncoder.matches(request.password, user.getPassword()))
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
                    return ResponseEntity.ok(new LoginResponse(token, user.getRole().name()));
                })
                .orElse(ResponseEntity.status(401).body(new LoginResponse("Invalid credentials", null)));
    }
}
