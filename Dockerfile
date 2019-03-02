FROM node:carbon

WORKDIR /usr/src/portfolio

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]