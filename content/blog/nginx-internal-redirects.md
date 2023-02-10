---
title: 'NGINX Internal Redirects'
excerpt: 'Displaying files outside of the web root, and doing some authentication along the way.'
date: 2023-02-09
category: learning
---

Sometimes when building an application, you'll deal with files that you need to display to users, but you want to keep out of the public directory to ensure users are authenticated and have authorization to view the file.

I'll use Laravel as an example, where a quick solution would be this in a controller:

```php
public function show(string $filename)
{
    return response()->file(
        app('files')->disk('private_files')->path($filename)
    );
}
```

That works, and is easy on developer time, but you end up with your application having to inefficiently read the file contents.

If you're limited to what you can do with your application server, you may want to make use of internal redirects with X-Sendfile. In NGINX, you'd use the X-Accel-Redirect header.

First, you'd update your NGINX conf file with a location block that points to your files directory:

```nginx
location ^~ /protected_files {
    internal;
    alias /path/to/project/files;
}
```

The internal directive makes it so that any requests from the internet matching that location block will result in a 404.

Then you could replace your Laravel controller method with this:

```php
public function show(string $filename)
{
    $mime = app('files')->disk('private_files')->mimeType($filename);

    return response()->noContent(headers: [
        'Content-Type' => $mime,
        'X-Accel-Redirect' => '/protected_files/' . $filename,
    ]);
}
```

That would give you the benefits of whatever authentication and authorization middleware you'd want to apply to this route, while avoiding the cost of actually processing the file with the application.

This is an intermediate step though -- you're still dealing with booting the application, so this really only works well for a small amount of files on a single page. For dealing with an image gallery, it'd make sense to move your files to S3 or DigitalOcean Spaces and create temporary URLs instead of links to your own application's routes:


```php
public function index()
{
    // ...

    $urls = [];

    foreach ($files as $file) {
        $urls[] = app('files')->disk('s3')->temporaryUrl($file);
    }

    // ...
}
```