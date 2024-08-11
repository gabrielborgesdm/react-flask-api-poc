BACKEND_CONTAINER_NAME=python_backend

.PHONY: docker/start docker/start-build docker/clean backend/test backend/migrate backend/upgrade backend/init

# Docker commands:

docker/start:
	docker compose up

docker/start-build:
	docker compose up --build

docker/clean:
	docker compose down --volumes --rmi all

# Backend commands:

backend/init:
	docker compose exec $(BACKEND_CONTAINER_NAME) python3 -m flask --app main db init

backend/migrate:
	@if [ "$(message)" = "" ]; then \
		echo "Please provide a migration message. Usage: make migrate message='Your migration message'"; \
		exit 1; \
	else \
		docker compose exec $(BACKEND_CONTAINER_NAME) python3 -m flask --app main db migrate -m "$(message)"; \
	fi

backend/upgrade:
	docker compose exec $(BACKEND_CONTAINER_NAME) python3 -m flask --app main db upgrade

backend/test:
	docker compose exec $(BACKEND_CONTAINER_NAME) pytest