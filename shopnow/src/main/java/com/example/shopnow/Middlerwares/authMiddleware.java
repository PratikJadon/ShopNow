package com.example.shopnow.Middlerwares;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.example.shopnow.utils.jwtHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@WebFilter(urlPatterns = "/api/products")
public class authMiddleware implements Filter {
    @Autowired
    private jwtHelper jwtHelper;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Check if the user is authenticated
        if (isAuthenticated(httpRequest) == null) {
            httpResponse.setContentType("application/json");
            httpResponse.setCharacterEncoding("UTF-8");
            httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());

            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("error", "Unauthorized");
            responseBody.put("message", "Authentication token is invalid");

            httpResponse.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
            return;
        }

        // If the user is authenticated, proceed with the request
        chain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        // Extract token from the request (e.g., from Authorization header)
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Remove "Bearer " prefix
        }
        return null;
    }

    private String isAuthenticated(HttpServletRequest request) {
        String userToken = extractToken(request);
        return jwtHelper.verifyJWT(userToken);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic, if needed
    }

    @Override
    public void destroy() {
        // Cleanup logic, if needed
    }
}
