import psycopg2

conn = psycopg2.connect(user = "postgres", password = "password", host = "127.17.0.3", port = "5432")
cursor = conn.cursor()

postgreSQL_select_Query = "select * from blocks"
cursor.execute(postgreSQL_select_Query)

print("Opened database successfully")
print(cursor.fetchall())

conn.commit()
conn.close()

# when executing script on prod build vm, getting output.  when executing on clone machine, getting reletions 'blocks' does not exist.