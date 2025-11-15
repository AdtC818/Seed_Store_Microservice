# Use official Maven image to build the app
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml and source
COPY pom.xml .
COPY src ./src

# Build the JAR
RUN mvn clean package -DskipTests

# --------------------
# Final lightweight image
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 8083

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
