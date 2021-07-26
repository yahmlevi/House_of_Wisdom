from datetime import datetime

logs_file = open("exam.log", "r")

start_transaction_time_in_ms_list = []
end_transaction_time_in_ms_list = []
transaction_id_list = []
for log in logs_file:
    if log.split()[5] == "transaction" and log.split()[7] == "begin":
        start_transaction_time = log.split()[1]
        d1 = datetime.strptime(start_transaction_time, "%H:%M:%S.%f")
        start_transaction_time_in_ms_list.append(d1)

    if log.split()[5] == "end" and log.split()[6] == "transaction":
        transaction_id_list.append(log.split()[7])
        end_transaction_time = log.split()[1]
        d2 = datetime.strptime(end_transaction_time, "%H:%M:%S.%f")
        end_transaction_time_in_ms_list.append(d2)
        
transactions_time_list = []
i = 0
for item in start_transaction_time_in_ms_list:
    transactions_time_list.append(end_transaction_time_in_ms_list[i] - start_transaction_time_in_ms_list[i])
    i += 1

# fastest_transaction_time = min(transactions_time_list)

# i = 0 
# for item in transactions_time_list:
#     if item == fastest_transaction_time:
#         item_index = i
#     i += 1

transactions_time_sum = 0
transactions_time_list_length = len(transactions_time_list)
for item in transactions_time_list:
    transactions_time_sum += int(str(item).split(".")[1])

print("AVERAGE TRANSACTION TIME IS - {}MS" .format(transactions_time_sum / transactions_time_list_length))