---
title: 'Introducing Key Rotater for Laravel'
excerpt: 'A package for rotating your application key.'
date: 2023-04-10
category:
  - coding
---

Today was the initial public release for [Key Rotater for Laravel](https://github.com/ivinteractive/laravel-rotation), so I'd like to explain a bit about the motivations behind the development of the package and why I think it's worth checking out.

Laravel allows for very rapid application development and has tons of functionality out of the box, but something that always bothered me was the usage of a single key for all encryption and decryption within the application without a built-in method for rotating the key in case of a breach. With compliance requirements at work necessitating having a plan in place, we had to build something to handle it.

If you search online for key rotation in Laravel you can find some guides on how to implement it, but they're mostly very simple solutions that might not mesh well with how your application is structured. There are also a couple of packages out there, but they run via commands and/or use Eloquent models, requiring you to add traits to your models.

With all that in mind, our package was developed with the following principles:

1. Provide a drop-in solution, requiring as few updates to the existing codebase as possible.
2. Push to the queue to make use of concurrency.
3. Avoid the performance hit that comes with Eloquent models.

The initial setup for the package requires you to set up an array of columns containing encrypted data in your config, consisting of dot-separated identifiers consisting of the table name, the primary key, and the encrypted column name. When running `php artisan rotation:run`, it will grab all of the records' primary keys, chunk them into jobs, and add them to a job batch. The records in each chunk get decrypted with an instance of `\Illuminate\Encryption\Encrypter` using the old application key and get re-encrypted with an instance using the new key. If configured, it's even possible to change the cipher used by your application. When the batch completes, it sends a notification to your configured notifiable.

All of this together met our requirements for a fully-featured solution, and we hope that it can meet others' needs as well. I'm really excited to get this package out in the world, and to see how can be improved even further with community feedback.