/* Получение товара по ID */


/* Ввод существующего ID */

pm.test("Статус-код запроса 200", function () {
    pm.response.to.have.status(200);
});

var clothes = pm.response.json();

var schema = {
    "type": "object",
    "required": ["result"],
    "properties": {
        "method": "/items/update",
        "status": "ok",
        "result": {
            "type": "object",
            "properties": {
                "id": {"type": "string"},
                "name": {"type": "string"},
                "section": {"type": "string"},
                "description": {"type": "string"},
                "color": {"type": "string"},
                "size": {"type": "string"},
                "price": {"type": "integer"},
                "params": {"type": "string"},
                "photo": {"type": "string"}
            }
        }
    }
};

pm.test('Тело ответа корректно отображается для существующего ID', function () {
    pm.expect(tv4.validate(clothes, schema)).to.be.true;
});


/* Ввод несуществующего валидного ID */

pm.test("Статус-код запроса 200", function () {
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

pm.test('Тело ответа корректно отображается для несуществующего валидного ID', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что товар с таким ID не найден", function () {
	pm.expect(pm.response.text()).to.include("Товар с ID");
    pm.expect(pm.response.text()).to.include("item_with_id_not_found");
});


/* Ввод ID на латинице */

pm.test("Статус-код запроса 200", function () {
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

pm.test('Тело ответа корректно отображается для невалидного ID', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что поле ID товара не заполнено", function () {
	pm.expect(pm.response.text()).to.include("Поле ID товара  не заполнено");
    pm.expect(pm.response.text()).to.include("id_not_filled");
});


/* Пустой запрос */

pm.test("Статус-код запроса 200", function () {
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

