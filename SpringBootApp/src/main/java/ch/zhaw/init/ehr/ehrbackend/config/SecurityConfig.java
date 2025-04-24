package ch.zhaw.init.ehr.ehrbackend.config;

import ch.zhaw.init.ehr.ehrbackend.service.UserService;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ch.zhaw.init.ehr.ehrbackend.security.JWTAuthFilter; // Ensure this is the correct package for JwtAuthenticationFilter

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTAuthFilter jwtAuthFilter) throws Exception{
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless API
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers( "/admin/templates/webtemplates/{templateId}").hasAnyRole("ADMIN", "SUPERUSER")
                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPERUSER", "DOCTOR")
                .requestMatchers("/superuser/**").hasRole("SUPERUSER")
                .requestMatchers("/doctor/**").hasAnyRole("ADMIN", "SUPERUSER", "DOCTOR")
                .requestMatchers("/patient/**").hasAnyRole("ADMIN", "SUPERUSER", "DOCTOR")
                .requestMatchers( "/template/{templateId}/webtemplate").hasAnyRole("ADMIN", "SUPERUSER")
                .requestMatchers("/formtemplate/**").hasAnyRole("ADMIN", "SUPERUSER")
                .requestMatchers("/template/**").hasAnyRole("ADMIN", "SUPERUSER","DOCTOR") //TODO: Remove Doctor as soon as there are forms based on templates
                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPERUSER","DOCTOR") //TODO: Remove Doctor as soon as there are forms based on templates
                .requestMatchers(HttpMethod.POST, "/ehr/composition").hasAnyRole("DOCTOR", "ADMIN", "SUPERUSER")
                .requestMatchers(HttpMethod.DELETE, "/doctor/**", "/patient/**").hasAnyRole("ADMIN", "SUPERUSER")
                .requestMatchers("/public/**", "/login").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
 

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // allow frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // <-- also needed if you're using cookies
    
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}