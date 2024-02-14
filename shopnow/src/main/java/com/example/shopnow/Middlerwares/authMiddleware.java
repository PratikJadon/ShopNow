package com.example.shopnow.Middlerwares;

import com.example.shopnow.utils.jwtHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@WebFilter(urlPatterns = "/api/products/*")
public class authMiddleware implements Filter {
    @Autowired
    private jwtHelper jwtHelper;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");

        // Check if the user is authenticated
        String user = isAuthenticated(httpRequest);
        if (user == null) {
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
        log.info("Token validated successfully.");
        request.setAttribute("user", user);
        chain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        // Extract token from the request (e.g., from Authorization header)
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            log.info("Token Found in request header.");
            return authorizationHeader.substring(7); // Remove "Bearer " prefix
        }
        log.warn("Token not found in request header or format is incorrect.");
        return null;
    }

    private String isAuthenticated(HttpServletRequest request) {
        String userToken = extractToken(request);
        return jwtHelper.verifyJWT(userToken);
    }
}
