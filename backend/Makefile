.PHONY: migrate upgrade start start-build clean test lint

migrate:
	@if [ "$(message)" = "" ]; then \
		echo "Please provide a migration message. Usage: make migrate message='Your migration message'"; \
		exit 1; \
	else \
		python3 -m flask --app main db migrate -m "$(message)"; \
	fi

upgrade:
	python3 -m flask --app main db upgrade

start:
	docker compose up

start-build:
	docker compose up --build

clean:
	docker compose down --volumes --rmi all

test:
	pytest
