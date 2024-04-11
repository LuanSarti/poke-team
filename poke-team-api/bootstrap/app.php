<?php

use App\Builder\ReturnApi;
use App\Exceptions\ApiException;
use App\Exceptions\ApiExeception;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Client\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api/index.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->appendToGroup('auth.api', [JwtMiddleware::class]);
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->renderable(function (NotFoundHttpException $e) {
            return ReturnApi::error('Route not found');
        });

        $exceptions->renderable(function (ValidationException $e, $request) {
            return ReturnApi::error($e->validator->errors()->first(), $e->validator->errors()->toArray());
        });

        $exceptions->render(function (Throwable $e, ) {
            return ReturnApi::error('Unexpected API error.');            
        });


    })->create();
