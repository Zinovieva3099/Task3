/* Поиск товара по названию */


/* Получение большого количества карточек товара */

pm.test("Статус-код запроса 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Время ответа меньше чем 200мс", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

var clothes = pm.response.json();

var schema = {
    "type": "object",
    "required": ["result"],
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["last_id", "title"],
                "properties": {
                    "last_id": {"type": "string"},
                    "title": {"type": "string"}
                }
            }
        }
    }
};

pm.test('Тело ответа корректно отображается для большого количества карточек товаров', function () {
    pm.expect(tv4.validate(clothes, schema)).to.be.true;
});


/* Получение 10 и меньше карточек товара */

pm.test("Статус-код запроса 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Время ответа меньше чем 200мс", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

var clothes = pm.response.json();

var schema = {
    "type": "object",
    "required": ["result"],
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["id", "name", "section", "description"],
                "properties": {
                    "id": {"type": "string"},
                    "name": {"type": "string"},
                    "section": {"type": "string"},
                    "description": {"type": "string"},
                    "color": {"type": "string"},
                    "size": {"type": "string"},
                    "price": {"type": "integer"},
                    "params": {"type": "string"}
                }
            }
        }
    }
};

pm.test('Тело ответа корректно отображается при выдаче 10 и меньше карточек товара', function () {
    pm.expect(tv4.validate(clothes, schema)).to.be.true;
});


/* Поиск товара только по размеру одежды */

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

pm.test('Тело ответа корректно отображается при незаполненном обязательном параметре', function () {
    pm.expect(tv4.validate(error_message, schema)).to.be.true;
});

pm.test("Отображается сообщение, что строка поиска не заполнена", function () {
	pm.expect(pm.response.text()).to.include("Строка поиска не заполнена!");
    pm.expect(pm.response.text()).to.include("query_not_filled");
});


/* Поиск товара по несуществующему названию и до валидной цены */

pm.test("Статус-код запроса 200", function () {
    pm.response.to.have.status(200);
});

var clothes = pm.response.json();

var schema = {
    "type": "object",
    "properties": {
        "method": {"type": "string"},
        "status": {"type": "string"},
        "result": {"type": "array"}
        }
    };

pm.test('Тело ответа корректно отображается для пустой выдачи поиска', function () {
    pm.expect(tv4.validate(clothes, schema)).to.be.true;
});

pm.test("В результатах поиска отсутствуют товары", function () {
    pm.expect(clothes.result).to.be.empty;
});

