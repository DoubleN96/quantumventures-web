FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY brand /usr/share/nginx/html/brand
COPY auditoria /usr/share/nginx/html/auditoria
COPY auditoria-servicio /usr/share/nginx/html/auditoria-servicio
COPY propuesta /usr/share/nginx/html/propuesta
COPY coach /usr/share/nginx/html/coach
COPY fiscal /usr/share/nginx/html/fiscal
COPY contactos /usr/share/nginx/html/contactos
COPY onboarding /usr/share/nginx/html/onboarding
COPY bali /usr/share/nginx/html/bali
COPY vision /usr/share/nginx/html/vision
COPY ambassadors /usr/share/nginx/html/ambassadors
COPY ambassador /usr/share/nginx/html/ambassador
COPY europe /usr/share/nginx/html/europe
COPY partnership /usr/share/nginx/html/partnership
COPY nuevo-cliente /usr/share/nginx/html/nuevo-cliente
COPY p /usr/share/nginx/html/p
COPY como-trabajamos /usr/share/nginx/html/como-trabajamos
COPY crm-demo /usr/share/nginx/html/crm-demo
COPY villa-brisa /usr/share/nginx/html/villa-brisa
COPY brave-the-world /usr/share/nginx/html/brave-the-world
COPY jaan-venues /usr/share/nginx/html/jaan-venues
COPY crm-jaan /usr/share/nginx/html/crm-jaan
COPY v2 /usr/share/nginx/html/v2
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
