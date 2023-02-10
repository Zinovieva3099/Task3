/* Изменение товара */


/* Обновление цены существующего товара */

pm.test("Информация по товару успешно обновлена. Статус-код 200", function () {
    pm.response.to.have.status(200);
});

var update_message = pm.response.json();

var schema = {
    "type": "object",
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {"type": "string"}
        }
    };

pm.test('Тело ответа корректно отображается', function () {
    pm.expect(tv4.validate(update_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что товар обновлен", function () {
	pm.expect(pm.response.text()).to.include("Товар обновлен!");
});


/* Обновление описания товара */

pm.test("Информация по товару успешно обновлена. Статус-код 200", function () {
    pm.response.to.have.status(200);
});

var update_message = pm.response.json();

var schema = {
    "type": "object",
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {"type": "string"}
        }
    };

pm.test('Тело ответа корректно отображается', function () {
    pm.expect(tv4.validate(update_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что товар обновлен", function () {
	pm.expect(pm.response.text()).to.include("Товар обновлен!");
});


/* Отправка запроса с обязательными параметрами, без указания их значений */

pm.test("Информация по товару успешно получена. Статус-код 200", function () {
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
        "message": {"type": "string"}
        }
    };

pm.test('Тело ответа корректно отображается для невалидного запроса на изменение товара', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что поле ID товара не заполнено", function () {
	pm.expect(pm.response.text()).to.include("Поле ID товара  не заполнено");
    	pm.expect(pm.response.text()).to.include("id_not_filled");
});


/* Изменение цвета и размера у товара с несуществующим ID */

pm.test("Информация по товару успешно получена. Статус-код 200", function () {
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
        "message": {"type": "string"}
        }
    };

pm.test('Тело ответа корректно отображается для некорректного запроса на изменение товара', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что товар c указанным ID не найден", function () {
	pm.expect(pm.response.text()).to.include("не найден!");
    pm.expect(pm.response.text()).to.include("item_with_id_not_found");
});