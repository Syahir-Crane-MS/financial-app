FROM php:8.4-fpm
RUN apt-get update -y
RUN apt-get install -y  \
  openssl \
  zip \
  unzip \
  git \
  libonig-dev \
  libzip-dev \
  postgresql \
  libpq-dev \
  libsodium-dev \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  libjpeg62-turbo-dev \
  libmcrypt-dev \
  libgd-dev \
  jpegoptim optipng pngquant gifsicle \
  libxml2-dev \
  vim \
  default-mysql-client
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg
RUN docker-php-ext-install  \
  mysqli \
  pdo_mysql \
  pdo \
  mbstring \
  zip \
  pgsql \
  pdo_pgsql \
  gd \
  exif \
  sodium
# Install Node.js (v18.x) and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get install -y nodejs && \
  npm install -g npm@10 && \
  npm install -g n && \
  n stable && \
  npm cache clean --force && \
  apt-get clean && rm -rf /tmp/* /var/lib/apt/lists/*
WORKDIR /var/www/html
# COPY . /app
# RUN composer install
# COPY .env.testing .env

CMD php artisan serve --host=0.0.0.0 --port=8181
#HEALTHCHECK --interval=30s --timeout=6s \
#  CMD curl -f http://localhost:8181 || exit 1
EXPOSE 8181
