import datetime

# convert html to pdf
# https://stackoverflow.com/questions/56907841/how-to-convert-html-to-pdf-using-python
def convert_html_to_pdf(html_file, pdf_file):
    pdfkit.from_file(html_file, pdf_file)


def calculate_days_between_dates(start_date, end_date):
    # calculate the number of days between two dates
    # https://stackoverflow.com/questions/1060279/iterating-through-a-range-of-dates-in-python
    # https://stackoverflow.com/questions/7035720/calculating-the-number-of-days-between-two-dates-in-python
    return (end_date - start_date).days

# calculate first day of the month from a date
def calculate_first_day_of_month(date):
    # https://stackoverflow.com/questions/3300464/get-first-day-of-the-month-from-a-date-in-python
    first_day_of_month = datetime.date(date.year, date.month, 1)
    return first_day_of_month

# Django server on localhost:8000