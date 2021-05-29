
VENV_NAME?=env
PYTHON=${VENV_NAME}/bin/python


install-api:
	test -d api/$(VENV_NAME) || virtualenv -p python3 api/$(VENV_NAME)
	api/${PYTHON} -m pip install -r api/requirements.txt

install-front:
	npm install --prefix ./front

install:
	make install-api
	make install-front

lint-api:
	api/$(VENV_NAME)/bin/pylint api/app/

test-api:
	rm test.db
	api/$(VENV_NAME)/bin/pytest api/app/tests/
