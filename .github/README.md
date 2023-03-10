[![Build Status](https://github.com/tahsingokalp/lett-tracker/workflows/tests/badge.svg)](https://github.com/tahsingokalp/lett-tracker/actions)
[![StyleCI](https://github.styleci.io/repos/607028357/shield?branch=development)](https://github.styleci.io/repos/607028357?branch=development)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=TahsinGokalp_lett-tracker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=TahsinGokalp_lett-tracker)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=TahsinGokalp_lett-tracker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=TahsinGokalp_lett-tracker)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=TahsinGokalp_lett-tracker&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=TahsinGokalp_lett-tracker)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=TahsinGokalp_lett-tracker&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=TahsinGokalp_lett-tracker)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=TahsinGokalp_lett-tracker&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=TahsinGokalp_lett-tracker)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=TahsinGokalp_lett-tracker&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=TahsinGokalp_lett-tracker)

Let is a simple to use and implement error tracker built for the Laravel framework.

## Requirements

* PHP 8.1 or higher
* Git
* Composer
* MySQL (>=5.7) or PostgreSQL (>=9.4)

## Installation

```bash
git clone https://github.com/tahsingokalp/let-tracker.git
composer install

npm i
npm run watch
# or
npm run dev
```

Configure your database in the `.env` file and then run:

```bash
php artisan migrate
```

###Docker

### Getting up and running...

Go into the docker folder and run:
`docker-compose up -d --build`

Set your database .env variables:
```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=larbug
DB_USERNAME=root
DB_PASSWORD=secret
```

Running artisan commands:

`docker exec -it larabug php artisan <command>`

The Application will be running on `localhost:1337` and PhpMyAdmin is running on `localhost:8010`

## Testing

```bash
./vendor/bin/pest[README.md](..%2F..%2FLet%2F.github%2FREADME.md)
```

## Changelog

Please see [CHANGELOG](../CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Sponsor

We appreciate sponsors, we still maintain this repository, server, emails and domain. [You can do that here](https://github.com/sponsors/Cannonb4ll).
Each sponsor gets listed on the Let sponsor page and when chosen the right tier you will be listed as official sponsor.

## License

The GPL-3.0 License (GPL-3.0). Please see [License File](LICENSE.md) for more information.

## Special Thanks

This repo forked from https://github.com/LaraBug/larabug-app - https://github.com/Cannonb4ll
