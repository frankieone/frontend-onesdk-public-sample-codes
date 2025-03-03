import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdvComponent } from './idv/idv.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { OnboardingManualComponent } from './onboarding-manual/onboarding-manual.component';
import { SardineComponent } from './sardine/sardine.component';
import { SmartUiComponent } from './smart-ui/smart-ui.component';
import { IdvReviewComponent } from './idv-review/idv-review';
import { E2eOcrBioComponent } from './e2e-ocr-bio/e2e-ocr-bio.component';

const routes: Routes = [
	{
		path: 'idv',
		title: 'IDV',
		component: IdvComponent
	},
	{
		path: 'onboarding',
		title: 'Onboarding',
		component: OnboardingComponent
	},
	{
		path: 'onboarding-manual',
		title: 'Onboarding Manual',
		component: OnboardingManualComponent
	},
	{
		path: 'sardine',
		title: 'Sardine',
		component: SardineComponent
	},
	{
		path: 'smartui',
		title: 'Smart UI',
		component: SmartUiComponent
	},
	{
		path: 'idv-review',
		title: 'IDV + Review Screen',
		component: IdvReviewComponent,
	},
	{
		path: 'e2e-ocr-bio',
		title: 'E2E OCR BIO',
		component: E2eOcrBioComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
