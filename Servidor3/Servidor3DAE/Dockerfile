FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/Servidor3DAE-0.0.1-SNAPSHOT.jar app.jar
COPY entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh

EXPOSE 8090

ENTRYPOINT ["./entrypoint.sh"]