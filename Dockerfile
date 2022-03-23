FROM python

COPY main.py requirements.txt /src/
COPY public/weather_app/build /src/public/weather_app/build
WORKDIR /src
RUN pip3 install -r requirements.txt
CMD ["python3", "main.py"]