var queryBuilder = function(table, queryParams) {

    var queryParams = queryParams;

    var sql = '';

    var buildSelect = function() {
        var cols = queryParams.value[0];
        var col = {};
        sql = "SELECT ";

        for(var i = 0; i < cols.value.length; i++) {

            col = cols.value[i];

            if (col["type"] === "group") {
                sql += col["name"] + ",";
            } else if (col["type"] === "aggregate") {
                sql += col["aggType"] + "(" + col["name"] + "),";
            }
        }

        sql = sql.slice(0, -1);

        return this;
    };

    var buildFrom = function() {
        sql += " FROM " + table;

        return this;
    };

    var buildWhere= function() {
        var conditions = queryParams.value[1];
        sql += " WHERE ";

        for(var i = 0; i < conditions.value.length; i++) {

            var thisName = conditions.value[i].name;
            var thisValue = conditions.value[i].value;

            sql += thisName + " IN (";

            for (j = 0; j < thisValue.length; j++) {
                if (typeof thisValue[j] === 'number') {

                    sql += thisValue[j] + ',';
                }
                else {
                    sql = sql  + "'" + thisValue[j] + "',";
                }
            }
            sql = sql.slice(0, -1);
            sql += ") AND ";
        }

        sql = sql.slice(0, -5);

        return this;
    };

    var buildGroupBy = function() {
        var cols = queryParams.value[0];
        var col = {};
        sql += " GROUP BY ";

        for(var i = 0; i < cols.value.length; i++) {
            col = cols.value[i];
            if (col["type"] === "group") {
                sql += col["name"] + ",";
            }
        }

        sql = sql.slice(0, -1);
        console.log("sql:" + sql);
        return this;
    };

    var buildOrderBy = function() {
        var cols = queryParams.value[0];
        var col = {};
        sql += " ORDER BY ";

        for(var i = 0; i < cols.value.length; i++) {
            col = cols.value[i];
            if (col["type"] === "group") {
                sql += col["name"] + ",";
            }
        }

        sql = sql.slice(0, -1);
        sql += ';'

        return this;
    };

    var print = function() {
        return sql;
    }

    return {
            buildSelect:buildSelect,
            buildFrom:buildFrom,
            buildWhere:buildWhere,
            buildGroupBy:buildGroupBy,
            buildOrderBy:buildOrderBy,
            print:print
    };

};