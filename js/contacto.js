$("#divCont").html(`<div class="sizeForm">
    <div>
        <h1 class="titleH1 bgH1">CONTACTANOS</h1>
    </div>
    <form class="row g-3">
        <div class="col-md-6 ">
            <label for="inputEmail" class="form-label">e-mail *</label>
            <input type="email" class="form-control" id="inputEmail1" placeholder="email@dominio.com" required>
        </div>
        <div class="col-md-6">
            <label for="inputPhone" class="form-label">Teléfono de contacto *</label>
            <input type="numbers" class="form-control" id="inputPhone1" required>
        </div>
        <div class="col-md-6 ">
            <label for="inputName" class="form-label">Nombre *</label>
            <input type="text" class="form-control" id="inputName1" required>
        </div>
        <div class="col-md-6">
            <label for="inputLastName" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="inputLastName1">
        </div>
        <div class="mb-3">
            <label for="formControlTextarea1" class="form-label">Dejanos tus sugerencias o comentarios *</label>
            <textarea class="form-control" id="formControlTextarea1" rows="5" required></textarea>
        </div>
        <div class="row-1">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" required>
                    <label class="form-check-label" for="gridCheck">Estoy de acuerdo *</label>
            </div>
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-secondary">Enviar</button>
        </div>
    </form>
</div>`);