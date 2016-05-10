describe('queryBuilder', function() {

    var queryData = {
        "name": "queryData",
        "value": [
            {
                "name": "outputs",
                "value": [
                    {
                        "name": "I1",
                        "type": "group"
                    },
                    {
                        "name": "F1",
                        "type": "group"
                    },
                    {
                        "name": "D1",
                        "type": "aggregate",
                        "aggType": "SUM"
                    },
                    {
                        "name": "D2",
                        "type": "aggregate",
                        "aggType": "COUNT"
                    }
                ]
            },
            {
                "name": "filter",
                "value": [
                    {
                        "name": "start_date",
                        "value": ['30-04-2015','31-04-2015']
                    },
                    {
                        "name": "i_code",
                        "value": [10,20]
                    }
                ]
            }
        ]
    };
    var table = "MAIN_TABLE";
    var builder;

    beforeEach(function() {
        builder = queryBuilder(table, queryData);
    });

    it('should build a select statement', function() {
        var sql = builder.buildSelect()
                            .print();
        var expected = "SELECT I1,F1,SUM(D1),COUNT(D2)";
        expect(sql).toBe(expected);
    });

    it('should build a select from statement', function() {
        var sql = builder.buildSelect()
                            .buildFrom()
                            .print();
        var expected = "SELECT I1,F1,SUM(D1),COUNT(D2) FROM MAIN_TABLE";
        expect(sql).toBe(expected);
    });

    it('should build a select from where statement', function() {
        var sql = builder.buildSelect()
                            .buildFrom()
                            .buildWhere()
                            .print();
        var expected = "SELECT I1,F1,SUM(D1),COUNT(D2) FROM MAIN_TABLE WHERE start_date IN ('30-04-2015','31-04-2015') AND i_code IN (10,20)";
        expect(sql).toBe(expected);
    });

    it('should build a select from where group by statement', function() {
        var sql = builder.buildSelect()
                            .buildFrom()
                            .buildWhere()
                            .buildGroupBy()
                            .print();
        var expected = "SELECT I1,F1,SUM(D1),COUNT(D2) FROM MAIN_TABLE WHERE start_date IN ('30-04-2015','31-04-2015') AND i_code IN (10,20) GROUP BY I1,F1";
        expect(sql).toBe(expected);
    });

    it('should build a select from where group by order by statement', function() {
        var sql = builder.buildSelect()
                            .buildFrom()
                            .buildWhere()
                            .buildGroupBy()
                            .buildOrderBy()
                            .print();
        var expected = "SELECT I1,F1,SUM(D1),COUNT(D2) FROM MAIN_TABLE WHERE start_date IN ('30-04-2015','31-04-2015') AND i_code IN (10,20) GROUP BY I1,F1 ORDER BY I1,F1;";
        expect(sql).toBe(expected);
    });

});