docker run --name openbr1 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name openbr2 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name openbr3 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name openbr4 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name openbr5 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name openbr6 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name openbr7 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name openbr8 -v /opt/enrolldata:/opt/app/lib/openbr/enrollData -d lukaasp/node-openbr:gallery
docker run --name proxy -d -p 80:80 --link openbr1:openbr1 --link openbr2:openbr2 --link openbr3:openbr3  --link openbr4:openbr4  --link openbr5:openbr5 --link openbr6:openbr6 --link openbr7:openbr7 --link openbr8:openbr8 tutum/haproxy
