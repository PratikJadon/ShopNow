package com.example.shopnow.Middlerwares;

import com.example.shopnow.utils.jwtHelper;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.io.IOException;

@Slf4j
@WebFilter(urlPatterns = "/api/products/*")
public class authMiddleware implements Filter {
    @Autowired
    private jwtHelper jwtHelper;

    /**
     * Filters requests to the /api/products/* endpoint for authentication.
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Set CORS headers to allow requests from all origins
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");

        // Handle preflight requests
        if ("OPTIONS".equals(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpStatus.OK.value());
            return; // Do not proceed with further processing for preflight requests
        }

        // Check if the user is authenticated
        String user = isAuthenticated(httpRequest);
        if (user == null) {
            // If user is not authenticated, return UNAUTHORIZED error
            httpResponse.setContentType("application/json");
            httpResponse.setCharacterEncoding("UTF-8");
            httpResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "Token is not valid");
        } else {
            // If the user is authenticated, proceed with the request
            log.info("Token validated successfully.");
            request.setAttribute("user", user);
            httpResponse.setStatus(HttpStatus.OK.value());
            chain.doFilter(request, response);
        }
    }

    /**
     * Extracts JWT token from the request header.
     *
     * @param request The HTTP servlet request
     * @return The JWT token extracted from the request header, or null if not found or invalid
     */
    private String extractToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            log.info("Token Found in request header.");
            return authorizationHeader.substring(7); // Remove "Bearer " prefix
        }
        log.warn("Token not found in request header or format is incorrect.");
        return null;
    }

    /**
     * Validates JWT token.
     *
     * @param request The HTTP servlet request
     * @return The user if authenticated, or null if token is invalid
     */
    private String isAuthenticated(HttpServletRequest request) {
        String userToken = extractToken(request);
        return jwtHelper.verifyJWT(userToken);
    }
}