/* Удаление товара */


/* Удаление существующего товара */

pm.test("Запрос на удаление товара успешно отправлен. Статус-код 200", function () {
    pm.response.to.have.status(200);
});

var delete_message = pm.response.json();

var schema = {
    "type": "object",
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {"type": "string"}
        }
    };

pm.test('Тело ответа корректно отображается', function () {
    pm.expect(tv4.validate(delete_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что товар удален", function () {
	pm.expect(pm.response.text()).to.include("успешно удален");
});


/* Ввод длинного числового ID несуществующего товара */

pm.test("Запрос на удаление товара успешно отправлен. Статус-код 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Время ответа меньше чем 200мс", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

var error_message = pm.response.json();

var schema = {
    "type": "object",
    "required": ["error","field_error", "message"],
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "field_error": {"type": "string"},
        "error": {"type": "string"},
        "message": {"type": "string"},
        }
    };

pm.test('Тело ответа корректно отображается для несуществующего валидного ID', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что товар с таким ID не найден", function () {
	pm.expect(pm.response.text()).to.include("не найден!");
    pm.expect(pm.response.text()).to.include("item_with_id_not_found");
});


/* Ввод некорректного числового ID */

pm.test("Запрос на удаление товара успешно отправлен. Статус-код 200", function () {
    pm.response.to.have.status(200);
});

var error_message = pm.response.json();

var schema = {
    "type": "object",
    "required": ["error","field_error", "message"],
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "field_error": {"type": "string"},
        "error": {"type": "string"},
        "message": {"type": "string"},
        }
    };

pm.test('Тело ответа корректно отображается для невалидного запроса', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что поле ID товара не заполнено", function () {
	pm.expect(pm.response.text()).to.include("Поле ID товара  не заполнено");
    pm.expect(pm.response.text()).to.include("id_not_filled");
});


/* Пустой запрос */

pm.test("Запрос успешно отправлен. Статус-код 200", function () {
    pm.response.to.have.status(200);
});

var error_message = pm.response.json();

var schema = {
    "type": "object",
    "required": ["error","field_error", "message"],
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "field_error": {"type": "string"},
        "error": {"type": "string"},
        "message": {"type": "string"},
        }
    };

pm.test('Тело ответа корректно отображается для пустого запроса', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что поле ID товара не заполнено", function () {
	pm.expect(pm.response.text()).to.include("Поле ID товара  не заполнено");
    pm.expect(pm.response.text()).to.include("id_not_filled");
});