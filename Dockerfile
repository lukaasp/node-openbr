FROM lukaasp/openbr:1.1.0

ADD . /opt/app/
WORKDIR /opt/app
RUN npm install

CMD ["forever","index.js","-p","80"]

VOLUME ["/opt/app/lib/openbr/enrollData"]
EXPOSE 80