/* Создание товара */


/* Создание товара с указанием всех валидных параметров */

pm.test("Запрос на добавление товара успешно отправился", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202]);
});

var clothes = pm.response.json();

var schema = {
    "type": "object",
    "required": ["result"],
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {
            "type": "object",
            "properties": {
                "id": {"type": "string"},
                "name": {"type": "string"},
                "section": {"type": "string"},
                "description": {"type": "string"},
                "size": {"type": "string"},
                "color": {"type": "string"},
                "price": {"type": "integer"},
                "params": {"type": "string"},
                "photo": {"type": "string"}
            }
        }
    }
};

pm.test('Карточка товара создалась корректно', function () {
    pm.expect(tv4.validate(clothes, schema)).to.be.true;
});


/* Создание товара с указанием только обязательных параметров */

pm.test("Запрос на добавление товара успешно отправился", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202]);
});

var clothes = pm.response.json();

var schema = {
    "type": "object",
    "required": ["result"],
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {
            "type": "object",
            "properties": {
                "id": {"type": "string"},
                "name": {"type": "string"},
                "section": {"type": "string"},
                "description": {"type": "string"},
			"params": {"type": "string"}
            }
        }
    }
};

pm.test('Карточка товара создалась корректно', function () {
    pm.expect(tv4.validate(clothes, schema)).to.be.true;
});


/* Создание товара по обязательным параметрам с пустым значением категории */

pm.test("Запрос на добавление товара успешно отправился", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202]);
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

pm.test('Тело ответа корректно отображается для некорректного запроса', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что не найдена категория товара", function () {
	pm.expect(pm.response.text()).to.include("Категория не найдена");
    pm.expect(pm.response.text()).to.include("section_not_found");
});


/* Создание товара, указывая только параметр фото */

pm.test("Запрос на добавление товара успешно отправился", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202]);
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

pm.test('Тело ответа корректно отображается для некорректного запроса', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что название товара не заполнено", function () {
	pm.expect(pm.response.text()).to.include("Название товара не заполнено!");
    pm.expect(pm.response.text()).to.include("name_not_filled");
});


